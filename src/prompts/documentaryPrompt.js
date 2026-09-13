export function documentaryPrompt(topic, language, duration) {
  return `
You are the world's best YouTube documentary writer and YouTube growth strategist.

Your job is to create a COMPLETE YouTube Documentary Package.

TOPIC:
"${topic}"

LANGUAGE:
${language}

DURATION:
${duration}

The documentary must be:

- Emotional
- Cinematic
- Documentary Style
- Educational
- Highly engaging
- Retention Optimized
- Curiosity Driven
- Fact Based
- Suitable for YouTube Monetization

OUTPUT:

# VIDEO TITLE

# HOOK

# INTRODUCTION

# COMPLETE DOCUMENTARY

25-40 scenes

Every scene must include:

Scene Number

Duration

Narration

Image Prompt

Video Prompt

Camera Angle

Camera Motion

Lighting

Sound Effects

Background Music

On-screen Text

Transition

# CONCLUSION

# CTA

# THUMBNAIL IDEA

# THUMBNAIL PROMPT

# SEO TITLE

# DESCRIPTION

# TAGS

# KEYWORDS

Return ONLY the final answer.
`;
}