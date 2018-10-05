# Gotchas

## Scaling text

Text cannot be resized by using the asset.scale property and keep the same visual quality, due to current limitations in pixi. Instead you need to use `l1.scaleText` function.