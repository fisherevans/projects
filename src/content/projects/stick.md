---
name: Stick
tagline: A concurrency-limited platform that rents out streamed Claude Code agent sessions.
summary: >
    A headless, multi-tenant service that gives other tools authenticated, semaphore-limited,
    streamed access to Claude Code agent sessions. The "talking stick" is the semaphore - hold
    one to run a turn, release it the instant the turn ends.
tech: [Go, Claude Code, SSE, streaming, DogStatsD]
status: active
year: 2026
order: 75
featured: true
accent: '#8a6bb0'
repo: https://github.com/fisherevans/stick
source:
    repo: stick
    commit: 9f94fd8
    captured: 2026-08-12
draft: false
---

Stick is the platform layer under a couple of my other tools. Instead of each app spinning up
and babysitting its own agent runtime, they present a bearer token, POST a turn to a session
key, and read a stream of tokens and tool events back. The name comes from the "talking stick":
a fixed pool of concurrency slots that a turn has to hold to run, so the whole service can't
outrun the compute available to it.

## How it works

- **Sticks are the semaphore.** There's a fixed pool of `N` slots across the service. Running a
  turn requires holding one; it's released the moment the turn ends. When all `N` are busy, new
  turns queue instead of failing.
- **Sessions are warm but cheap.** A session is a Claude Code agent bound to a caller-chosen
  key. Between turns there's no running process, so an idle session holds no stick and costs
  nothing - only simultaneous turns contend.
- **Streamed turns over SSE.** POST a turn, read `token`, `tool_start`/`tool_end`,
  `structured_output`, and a terminal `turn_completed`/`error` frame on the same response.
- **Structured output as a contract.** Callers declare output tools with JSON schemas; the
  runtime validates the agent's calls in-band, so a declared schema is a guarantee, not a hint.
- **Consumer owns durable state.** Idle sessions get evicted; the caller treats that as normal
  and rehydrates from its own store.

## Building against it

There's no UI, so the ergonomics live in the shape of the API a consuming app writes
against, and the goal was that integrating should feel boring. You present one bearer
token, POST a turn to a session key, and read frames back off the same response - `token`
for streamed text, `tool_start`/`tool_end` if you want to show a pending state,
`structured_output` for machine-readable results, and exactly one terminal
`turn_completed` or `error` that closes the stream. A caller that only wants final text
buffers the tokens and ignores the rest. The semaphore is what makes it safe to build
against without thinking about capacity: hold a stick to run, release it when the turn
ends, and if the pool is full your turn queues instead of failing - so a consumer never
has to write its own backpressure or retry-on-overload. Structured output is the other
deliberate bet: you declare output tools with JSON schemas and the runtime validates the
agent's calls in-band, so a declared schema is a contract you can parse against, not prose
you have to scrape. And since the consumer owns durable state, an evicted idle session is
a non-event - you rehydrate from your own store, which keeps the mental model small.

## Notes

It's internal infrastructure, not a user-facing app - no login flow, just per-consumer
provisioned secrets. It emits DogStatsD so pool pressure, queue depth, and per-turn cost are
all visible on a dashboard.
