# Hero artwork status

Checkpoint 2, 13 November 2026. The displayed artwork is a **temporary SVG glass study**, not a final generated 3D asset. Its caption explicitly states “Temporary glass study / Original artwork pending.”

## Generation attempt

Used the built-in image-generation tool under the imagegen skill with transparent background enabled. The request failed with `image generation failed: connection failed: error sending request`. No raster image was returned or saved. No API/CLI fallback was invoked, and no API key is needed for the current placeholder.

Exact prompt:

> Use case: stylized-concept. Asset: original premium portfolio hero sculpture, square composition. A single flowing ribbon of thick clear optical glass twisting into two elegantly interconnected open loops, sculptural and asymmetrical, floating at a slight diagonal. Frosted ice-blue edges, deep navy internal reflections, extremely subtle pink refraction on one edge only. Sophisticated studio softbox lighting, physically realistic refraction, polished 3D product render with soft contact shadow. Centered object fully contained with generous transparent margins. True transparent background, no opaque backdrop, no pedestal, no typography, no text, no logos, no charts. Intended to sit on flat #DBF2FC.

## Current asset

`components/hero/glass-study.tsx` contains an original lightweight vector composition of two glass-like elliptical loops, with SVG lighting gradients and a soft shadow. It has no runtime WebGL, external image requests or continuous animation. Its decorative canvas is hidden from assistive technology; the status caption remains readable.

This study establishes scale, position and palette. It does not meet the final physically realistic sculpture requirement. The loop shapes are a conceptual placeholder, not a representation of project or business data.

## Replacement procedure

When generation is available, retry the prompt and inspect transparency, material realism, ring intersections and composition. Save the selected original in the workspace, derive appropriately sized transparent WebP/AVIF files in `public/images/`, and replace the SVG inside the existing figure. Use explicit dimensions and responsive sizing; no layout jump. Keep image alt empty for this decorative asset. Remove the temporary caption only after the final art is actually integrated and reviewed.

Target approximately 250KB for the delivered hero variant, preserving alpha and visual quality. Inspect on ice-blue and white backgrounds to catch baked-in backdrops or edge artifacts. Compare desktop and mobile crops and reduced-motion behavior. Do not replace the placeholder with a stock sculpture or silently add a heavy rendering library.
