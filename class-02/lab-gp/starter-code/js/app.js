'use strict';

let allImages = [];

function Image(imageObj) {
  this.image_url = imageObj.image_url;
  this.title = imageObj.title;
  this.description = imageObj.description;
  this.keyword = imageObj.keyword;
  this.horns = imageObj.horns;

  allImages.push(this);
}

Image.prototype.render = function() {
  // GET HTML - where section id = photo-template
  const myTemplate = $('#photo-template').html();

  // MAKE NEW SECTION
  const $newSection = $('<section></section>');

  // ADD TEMPLATE TO NEW SECTION
  $newSection.html(myTemplate);

  // FIND ELEMS IN DOM AND POPULATE
  $newSection.find('h2').text(this.title);
  $newSection.find('img').attr('src', this.image_url);

  // APPEND TO MAIN
  $('main').append($newSection);
}

// AJAX TO GET DATA

$.ajax('./data/page-1.json', {method: 'GET', dataType: 'JSON'})
  .then(data => {
    data.forEach(image => {
      let theImage = new Image(image);
      theImage.render();
    })
  });
