---
name: trmnldash
tagline: An e-ink dashboard renderer for TRMNL devices.
summary: >
    A renderer for TRMNL e-ink displays. One container hosts any number of
    dashboards on independent schedules, each composed of weather and calendar
    panels rendered into a device-specific PNG that the device polls over HTTP.
tech: [Python, Jinja2, Chromium, Pillow]
status: active
year: 2026
order: 48
featured: false
accent: '#7a8a5a'
repo: https://github.com/fisherevans/trmnl-weather-dash
source:
    repo: trmnl-weather-dash
    commit: 9c9cec1
    captured: 2026-08-12
draft: false
---

trmnldash renders dashboards for TRMNL e-ink devices. TRMNL's Image Display
plugin just polls a URL for a PNG, so this is the other half: a server that
composes panels, renders them to a device-specific image on a schedule, and
serves them. One process can host several dashboards at once, each on its own
refresh cadence, so a one-minute weather panel and a ten-minute calendar panel
share the same container.

## How it works

- **Render pipeline.** Each panel is a single Jinja2 template with inline CSS,
  screenshotted by headless Chromium, then palette-quantized with Pillow down to
  the panel's greyscale depth (down to 4-bit / 16 greys).
- **Composable panels.** A landscape weather panel, a portrait Google Calendar
  agenda, and a compact weather panel compose in any combination via a YAML
  layout tree of vstacks and hstacks.
- **Pluggable weather sources.** Open-Meteo (no key, global) or the US NWS sit
  behind one protocol, with an optional Home Assistant integration that prefers
  real indoor/outdoor sensor readings over the API's model estimate.
- **Device-aware output.** A device profile carries size, palette, and rotation;
  the same layout targets a large TRMNL X or a smaller TRMNL OG.

## Notes

Designed around the 4-bit target - solid silhouettes over semi-transparency,
hand-picked greys that survive quantization, and density-shifted chart fills
that stay legible in both day and night regions of the panel. The dashboards it
drives are served behind per-dashboard secret paths, so no live instance is
public.
