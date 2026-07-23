# vision board!!
this is a vision board where you can drag things around, write on them, draw, add shapes, and just build out a little visual space of whatever you are into at the moment. right now there is only custom board that funtions, whic is meant to feel more like a digital corkboard you can mess with freely. i have a templates card as well but that is something i plan to ship as an update! everything from the background to the borders to the text styling is customizable.

i also built a couple of small APIs during the development of this project, of my own to power the fun extras, like a color palette generator and a music player that pulls from my own song list:

> ai usage: claude for debugging, especially canvas sizing issues and dragging photos, help with the dash pattern offset logic for the draw tool, and some with hex input as well!

> note: there's a fair amount of repeated logic and styling like the color picker + hex input syncing is mostly duplicated across the text, background, and shape studios instead of being written once and reused. same goes for a chunk of the css, since a lot of the popup windows and swatches share nearly identical rules under different ids.

<table>
  <tr><td><strong>random song:</strong> <a href="https://vision-board-mu.vercel.app/api/random">https://vision-board-mu.vercel.app/api/random</a></td></tr>
  <tr><td><strong>songs list:</strong> <a href="https://vision-board-mu.vercel.app/api/songs">https://vision-board-mu.vercel.app/api/songs</a></td></tr>
  <tr><td><strong>palette:</strong> <a href="https://vision-board-mu.vercel.app/api/palette">https://vision-board-mu.vercel.app/api/palette</a></td></tr>
</table>

## features and glimpses :D
<table>
  <tr>
    <td><img src="https://cdn.hackclub.com/019f8ee8-8a04-7920-85ae-74edd26c2683/2026-07-23%20(4).png" width="350"></td>
    <td><img src="https://cdn.hackclub.com/019f8eea-6564-7f52-830b-97616286352b/visionboard%20for%20readme%201.png" width="350"></td>
    <td><img src="https://cdn.hackclub.com/019f8ee9-241c-7a42-9fad-902762c5e67e/2026-07-23%20(2).png" width="350"></td>
  </tr>
</table>
everything on the custom board, photos, text, whatever you drop in is draggable, resizable, and rotatable, so you can arrange things exactly how you want rather than being locked into a grid. text comes with its own little studio where you can change the color, size, and font, including pasting in your own google fonts embed code if the built in options aren't enough, plus bold and italic. the background gets the same treatment through its own studio - color, an optional grid overlay, and border color/style so the board itself isn't stuck looking one way.

for actually drawing on the board, there's a draw window with pencil, marker, highlighter, and eraser tools, each with adjustable stroke color, size, and style, including solid, dashed, and dotted lines. alongside that is a shape tool for dropping in rectangles, circles, lines, and triangles, with control over stroke and fill color.

and then there's a color palette generator that pulls a themed palette from one of my custom api ( that i listed above) click any swatch and it copies the hex code straight to your clipboard. there's also a music player pulling from another custom api, with a random song option if you don't want to pick. at the end once the board looks the way you want, you can export the whole thing as an image.

## known limitations &  future updates
<table>
  <tr>
    <td><img src="https://cdn.hackclub.com/019f8eed-4003-7f3e-90b6-53eff4ebafb6/Screenshot%202026-07-23%20172203.png"></td>
    <td><img src="https://cdn.hackclub.com/019f8eef-211a-7f96-9541-506ea4bc5613/Screenshot%202026-07-23%20172337.png"></td>
  </tr>
</table>
right now the "new board" button in the toolbar doesn't do anything and that's intentional, not a bug. it's a placeholder for a proper drafts and editor system im planning to build next, where boards will actually save and you'll be able to switch between multiple ones instead of just working on whatever's currently open. alongside that, i want to add auto save so nothing gets lost if you switch tabs or close the window without thinking about it, plus keyboard shortcuts for the tools people reach for most, and eventually some starter templates so the board doesn't always have to begin completely blank.