# Block-Toy-Version-2

Changelog between this version and my initial implementation of the game:

1. Considerable HTML restructure, making the implemetation or of new elements much easier without considerable changes to accompanying Javascript or having to play with repositioning within CSS.

2. Complete CSS refaction. Instead of absolute positioning of elements on the page, self-taught and then implemented CSS grid to handle page positioning as well as made all elements on the page dynamically resizeable with viewport sizing. 
  - Myself and Shiwei (first instructor withing Get Coding NL) had difficulty rendering the page on different mobile devices and browsers (iPhone vs Huawei), as a result of this       restructure, mobile viewing should be improved and more consistent.
  - Should also see improvements to page structure and consistency for different native resolutions on computer monitors.

3. Added comments within entire project to better explain my thought process behind implementing features and how they work.

4. Refactored game tile generation to reflect the removal of absolute positioning.

5. Changed how valid vertical move arrows are appended to game tiles. A new CSS class is now added and removed to a game tile as the board changes, instead of constantly generating and deleting new divs.

6. Condensed code relating to the rotation of puzzle rows.

7. Removed redundant code related to win conditions.

8. Used jQuery where possible, and the library 'underscore' to assist in some of the games functions where previously not implemented.
