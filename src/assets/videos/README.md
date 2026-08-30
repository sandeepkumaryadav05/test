# Hero Video Placement — `devansh-dairy-hero.mp4`

Drop your legally licensed, AI-generated cinematic clip here as:

    src/assets/videos/devansh-dairy-hero.mp4

The homepage hero picks it up automatically on the next build / dev reload —
no code changes required. Until the file exists, the hero gracefully falls
back to `src/assets/images/devansh-dairy-hero-poster.jpg` (if you place one)
or a farm photo frame, so there is never a blank or broken hero.

Workflow:

    AI Video Generator → generate 6 clips → edit/stitch → export
    → src/assets/videos/devansh-dairy-hero.mp4 → Vercel

---

## Shared style block (append to every shot prompt)

> Photorealistic cinematic documentary style, natural golden-hour sunlight,
> warm natural color grading, 35mm/50mm cinematic lens, shallow depth of
> field with soft green bokeh, slow smooth camera movement, premium dairy
> commercial aesthetic, rural Indian dairy farm, realistic anatomy and
> natural motion, no text, no logos, no watermarks.

Negative prompt: cartoon, 3D animation, CGI look, deformed animals, extra
legs, extra horns, floating objects, artificial grass, oversaturated colors,
fantasy environment, text, watermark, logo.

### SHOT 1 — Morning Farm (~5s)

Peaceful green dairy farm at early morning. Healthy cows slowly walk through
a lush green field. Warm golden sunrise light, light morning mist, trees and
grass moving naturally in a gentle breeze. Camera slowly moves forward
through the field. Cinematic documentary photography, natural colors.

### SHOT 2 — Cow Walking (~5s)

A beautiful healthy Indian dairy cow slowly walks through a green pasture,
other cows softly visible behind it. The cow naturally moves its head while
walking and grazing; grass moves gently in the wind; warm sunlight creates
soft highlights around the cow. Slow cinematic tracking shot beside the cow.
Photorealistic, realistic anatomy and gait.

### SHOT 3 — Cow Grazing (~4s)

Close cinematic shot of a healthy dairy cow peacefully grazing fresh green
grass. Detailed realistic fur, natural blinking and breathing, soft sunlight,
small particles floating in the morning air, soft green bokeh background,
very shallow depth of field, slow camera push-in. Peaceful premium
agricultural commercial aesthetic.

### SHOT 4 — Farmer Walking (~5s)

A friendly Indian dairy farmer walks naturally through the green farm
carrying a traditional stainless-steel milk can, healthy cows walking in the
background. Warm morning sunlight, authentic clothing, realistic human
movement, camera follows slowly from a slightly cinematic side angle.
Documentary-style cinematography, no exaggerated acting, no studio look.

### SHOT 5 — Fresh Milk (~4s)

Cinematic close-up of fresh white milk being poured slowly from a
stainless-steel container into a clean traditional milk can. Beautiful creamy
stream, small realistic splashes, soft golden sunlight reflecting on the
metal, farm softly blurred in the background. Very detailed milk texture,
slow motion, macro food cinematography, premium dairy commercial aesthetic.

### SHOT 6 — Farm Wide Shot (~5s)

Wide cinematic view of the dairy farm: several healthy cows walking across a
lush green field, a farmer visible in the distance, trees, grass and farm
buildings behind. Golden-hour sunlight, gentle breeze in the grass, camera
slowly rises and pulls back revealing the landscape. Peaceful emotional
ending.

---

## Edit / export settings

- Stitch shots in order 1→6 into one seamless ~20-30 second loop
- Cross-dissolve or match-cut on movement; avoid obvious jump cuts
- Container/codec: MP4, H.264 (+ silent AAC track), 24-30 fps
- Resolution: 1920x1080 maximum
- Bitrate: ~4-6 Mbps web-optimized; keep the file well under 15 MB
- Loop point: end frame should flow back into the first shot naturally

## Player behaviour (already implemented)

autoplay + muted + loop + playsInline + preload="metadata", no native
controls, poster fallback, automatic swap to the poster image if the video
fails to load.
