# Hero artwork status

Checkpoint 3.1. The artwork remains an SVG glass fallback, not a generated 3D model. At the owner's request it is now label-free, substantially enlarged and positioned as a hero background layer. Its fallback status is documented here rather than displayed as an overlay or caption.

## Generation attempt

Used the built-in image-generation tool under the imagegen skill with transparent background enabled. The request failed with `image generation failed: connection failed: error sending request`. No raster image was returned or saved. No API/CLI fallback was invoked, and no API key is needed for the current placeholder.

Exact prompt:

> Use case: stylized-concept. Asset: original premium portfolio hero sculpture, square composition. A single flowing ribbon of thick clear optical glass twisting into two elegantly interconnected open loops, sculptural and asymmetrical, floating at a slight diagonal. Frosted ice-blue edges, deep navy internal reflections, extremely subtle pink refraction on one edge only. Sophisticated studio softbox lighting, physically realistic refraction, polished 3D product render with soft contact shadow. Centered object fully contained with generous transparent margins. True transparent background, no opaque backdrop, no pedestal, no typography, no text, no logos, no charts. Intended to sit on flat #DBF2FC.

## Current asset

`components/hero/glass-study.tsx` contains the existing lightweight vector composition of two glass-like elliptical loops, with SVG lighting gradients and a soft shadow. All captions, annotations and decorative text were removed. It has no runtime WebGL, external image requests or continuous animation. Its decorative canvas is hidden from assistive technology and cannot intercept pointer events.

`components/hero/glass-motion.tsx` uses Motion scroll values and transform interpolation. It rotates the vector in 2D from −12° to 38° over the first 1000px of page scroll, with a short spring. Only transform changes; React state does not update per scroll frame. Reduced-motion preferences and phone widths ≤599px disable rotation. Desktop artwork uses absolute positioning; mobile reserves a fixed-height space to avoid layout shifts.

This study establishes scale, position and palette. It does not meet the final physically realistic sculpture requirement. The loop shapes are a conceptual placeholder, not a representation of project or business data.

## Replacement procedure

If a final raster sculpture is later requested, retry generation and inspect transparency, material realism, ring intersections and composition. Save the selected original in the workspace, derive appropriately sized transparent WebP/AVIF files in `public/images/`, and replace the SVG inside the existing motion wrapper. Keep explicit sizing and empty decorative alt text. This would still be a flat asset rotated in 2D; true multi-axis model rotation would need a separate evaluation.

Target approximately 250KB for the delivered hero variant, preserving alpha and visual quality. Inspect on ice-blue and white backgrounds to catch baked-in backdrops or edge artifacts. Compare desktop and mobile crops and reduced-motion behavior. Do not replace the placeholder with a stock sculpture or silently add a heavy rendering library.
