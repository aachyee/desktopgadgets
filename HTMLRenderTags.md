# Introduction #

This page lists all the tags which are supported by the HTMLRender script. Any tags not listed here would be interpreted as standard tags like <span> and will not have any special rules such as explicit linebreaks, indents or styles.<br>
<br>
<h2>Tags</h2>

<ul><li>body<br>
</li><li>hr<br>
</li><li>img<br>
</li><li>br<br>
</li><li>a<br>
</li><li>h1, h2, h3, h4, h5, h6<br>
</li><li>p<br>
</li><li>blockquote<br>
</li><li>b, strong<br>
</li><li>u, ins, abbr, acronym<br>
</li><li>i, em, var<br>
</li><li>del, s, strike<br>
</li><li>code, kbd, tt, samp<br>
</li><li>sub, sup<br>
</li><li>listing, plaintext, xmp, pre<br>
</li><li>q, bdo<br>
</li><li>ul, ol, dl, li, dt, dd</li></ul>

<h2>Attributes</h2>

Attributes are only valid for the tag they were set for. For all elements HTMLRender will evaluate <b>title</b>, <b>color</b>, <b>background</b>, <b>size</b>, <b>face</b> and <b>align</b> attributes. If they are available they will be set accordingly. Since some attributes are not available in Google Desktop divs these attributes are set for the main htmlDiv element. This is used especially for background or bgcolor settings applied to the body element.<br>
<br>
<h3>Lists</h3>

Lists have the attribute "type" which can be <b>1</b>, <b>a</b>, <b>A</b>, <b>i</b>, <b>I</b>, <b>disc</b>, <b>circle</b> or <b>square</b>. HTMLRender will automatically switch to the next type (disc -> circle or circle -> square) if nested lists are used. Numerical, alphabetical and roman numbering is supported.