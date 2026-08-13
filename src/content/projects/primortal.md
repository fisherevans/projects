---
name: Primortal
tagline: A Game Boy Advance-shaped, catch-'em-all sci-fi roguelike, hand-built in Go.
summary: >
    A single-player, pixel-art, sci-fi roguelike where you pilot a remote-controlled mech to
    explore alien worlds and capture the lifeforms you find. Built in Go on a custom engine,
    designed to be played in the form factor of a Game Boy Advance. A long-running hobby.
tech: [Go, custom engine, pixel art]
status: active
year: 2026
order: 68
featured: true
accent: '#4fa595'
hero: ./media/primortal-demo.jpg
thumbnail: ./media/primortal-demo.jpg
repo: https://github.com/fisherevans/project-f
links:
    - label: devlog
      href: https://www.tumblr.com/fishwingdev
    - label: demo
      href: https://www.youtube.com/watch?v=4j0PABJWh3c
blogTag: gamedev
source:
    repo: project-f
    commit: d76cac0
    captured: 2026-08-13
---

Primortal is the game I've been chipping away at as a hobby for years - the "actually build a
real RPG" itch that's been in the back of my head since high school. You play an astrobiologist
who explores alien planets by remotely piloting a humanoid mech, capturing the lifeforms you
find and harnessing their powers, while the story of the corporation you work for slowly
unravels. It's deliberately built to feel like a game you'd play on a Game Boy Advance.

## How it works

- **A custom engine, in Go.** Rather than reach for an off-the-shelf game engine, it's built on
  an engine I wrote - which is half the point. The GBA form factor is a real constraint that
  shapes the art, the resolution, and the input model.
- **Explore and capture.** You pilot an Animech across alien worlds, find creatures, and
  catalog their physical and metaphysical properties - their Primortal forms - with an in-world
  tool. Captured lifeforms feed back into what you can do.
- **Tactical, turn-based combat.** Combat mixes turn-based skill selection with well-timed
  execution - pick your skills, then land them.
- **Pixel art, mostly hand-tuned.** The look is bought-and-heavily-modified sprite work pushed
  toward a consistent retro style; the devlog is largely a trail of art and animation passes.

## The feel

The Game Boy Advance form factor isn't nostalgia dressing, it's the constraint
everything else answers to. The whole game renders to a 240x160 canvas and reads five
inputs - A, B, the D-pad, Start, Select - and capping resolution and controls that hard
is deliberate: it keeps scope honest, forces the mechanics to stay legible at a glance,
and means it plays the same on a handheld as it does on a desktop. The other rule I hold
myself to is that a 15-minute sitting should earn real progress - it's a game you pick up
between things, not one that wants your whole evening. Combat is where "easy to learn,
hard to master" has to pay off: you pick skills turn by turn, then land them on timing,
so a fight is a few clean decisions rather than a menu you grind through.

## Notes

It's a hobby project and openly a work in progress - the devlog exists mostly so I can look back
and see that I've actually made progress when it doesn't feel like it. There's a recent gameplay
demo linked above.
