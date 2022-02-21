const header = `<header>
<div class="header">
  <div class="wrapper">
    <div class="header-top">
      <a class="logo" href="index.html">
        <span class="logo-image"></span>
        <span>Инженерная психология (ИНИС)</span>
      </a>
      </div>
    </div>
  </div>
  <div class="header-bottom">
    <div class="wrapper">
      <ul class="nav">
        <li><a href="products.html">T-shirts</a></li>
        <li><a href="not_implemented.html">Hoodies</a></li>
        <li><a href="not_implemented.html">Create Your Own</a></li>
        <li><a href="not_implemented.html">About Us</a></li>
        <li><a href="not_implemented.html">Your Account</a></li>
      </ul>
    </div>
  </div>
</div>
</header>`;

const footer = `<footer>
<div class="wrapper">
  <ul class="nav" id="footer">
    <li><a href="not_implemented.html">Contact Us</a></li>
    <li><a href="not_implemented.html">Site Map</a></li>
    <li><a href="not_implemented.html">Private Policy</a></li>
    <li><a href="not_implemented.html">Careers</a></li>
    <li><a href="not_implemented.html">Reviews</a></li>
    <li><p>Designed by Vladislav Yaromchik</p></li>
  </ul>
</div>
</div>
</footer>`;

document.querySelector("body").insertAdjacentHTML("afterbegin", header);
document.querySelector("body").insertAdjacentHTML("beforeend", footer);