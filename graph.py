import anvil
from random import choice

import json

with open('./data.json') as f:
  data = json.load(f)

# Create a new region with the `EmptyRegion` class at 0, 0 (in region coords)
region = anvil.EmptyRegion(0, 0)

# Create `Block` objects that are used to set blocks
bedrock = anvil.Block('minecraft', 'bedrock')
stone = anvil.Block('minecraft', 'stone')
dirt = anvil.Block('minecraft', 'dirt')

block = stone
for z in range(512):
  for x in range(512):
    # a flat surface is necessary to prevent minecraft from filling in space in the void
    block = bedrock
    region.set_block(block, x, 1, z)
    height = 0

    if str(x) in data:
      if str(z) in data[str(x)]:
        tower = data[str(x)][str(z)]
        height = tower['height']
        b = tower['block']
        if b == 'dirt':
          block = dirt
        elif b == 'stone':
          block = stone

    if height > 255:
      height = 255
    for y in range(height):
      region.set_block(block, x, y + 1, z)

# Save to a file
region.save('graph.mca')
