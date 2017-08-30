$(document).ready(function () {
  
  //load playist on ready
  getPlaylists("http://pastebin.com/raw/QtUHJ78r");

  $('#m3uForm').on('submit', function (e) {
    e.preventDefault();

    //var $this = $(this);
    var playlists = $('#playlists').val();

    getPlaylists(playlists);

  });
});

function getPlaylists(playlists) {
  
  $('#result').html(''); // empty list

  $.ajax({
    url: 'http://codesniff.com/scripts/GC-m3u-parser/GC-m3u-parser.php',
    method: 'GET',
    dataType: 'jsonP',
    data: {
      url: playlists,
      //url: 'https://www.rt.com/rss',
    }
  }).done(function (data) {
    //if(data.status != 'ok'){ throw data.message; }
    
    $('#result').text('Total: '+data.length+' Channels found'); // TOTAL COUNT

    $.each(data, function (i, item) {

      var tvglogo = '';
      
      if (typeof item["tvg-logo"] != 'undefined')
        tvglogo = '<img src="'+item["tvg-logo"]+'" alt="' + item.title + '" style="width:38px;height:38px;float:left;marging: 5px;border:solid 1px #ccc;margin-right:5px">';
        
      $('#result').append('<li><a href="' + item.url + '">' + tvglogo + ' ► ' + item.title + '</a><br>' + item.url + '</li>');

    });

  });

}

/* FOR DEMO */
$(document).on('click', '#result a', function (e) {
  e.preventDefault();
  
  $('#result a').removeClass('bold');
  $(this).addClass('bold');
  
  var mediaUrl = $(this).attr('href');
  //alert(mediaUrl);
  loadStream(mediaUrl)
});
