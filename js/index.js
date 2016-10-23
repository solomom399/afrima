var path = "http://afrimajury.com/mobile-server/";

$(".login").submit(function(){
  $(".gain").html("<img src='image/load.gif' style='width: 20px; height: 20px;'> Logging in...")
  $.ajax({
      context: this,
      type: "POST",
      url: path+"login.php",
      data: new FormData(this),
      contentType: false,
         cache: false,
   processData:false,
      success: function(resp) {
        $(".gain").html("Login")
        if(resp == "1"){
          $(".gain").attr("disabled","disabled")
          location.href = "data/home.html"
        } else {
          $(".err").text(resp).css({
            "background": "red",
            "padding": "20px"
          })
        }
      }
    })

  return false
})

$(".search").submit(function(){
  $("#get_result").html("<center><img src='../image/load.gif' style='width: 20px; height: 20px;'> Loading...</center>")
  var table = $("select[name=hold]").val()
  if (table == "first") {

    user_image = "http://afrimajury.com/afrima-n/africa_award_ceremony/photo/"

  } 

  if (table == "second") {

    user_image = "http://afrimajury.com/afrima-n/africa_music_village/photo/"

  } 

  if (table == "third") {
    
    user_image = "http://afrimajury.com/afrima-n/africa_music_business_summit/photo/"

  } 

  if(table == "fourth"){

    user_image = "http://afrimajury.com/afrima-n/africa_media_accrediation/photo/"

  }


  $.ajax({
      context: this,
      type: "POST",
      url: path+"search.php",
      dataType: "JSON",
      data: new FormData(this),
      contentType: false,
         cache: false,
   processData:false,
      success: function(resp) {
          for(var i in resp) {
            var row = resp[i];
            $("#get_result").html('<center><div class="col-md-4 col-sm-4 lp"><div class="card"><img class="card-bg" src="../image/card.png"><img class="card-img-top" src="'+user_image+row['photo']+'" alt="Card image cap"><div class="card-block"><h4 class="card-title">'+row['full_name']+'</h4><p class="card-text">'+row['organization']+'</p><p class="card-text">'+row['email']+'</p><button class="btn btn-primary verify" hold="'+table+'" user-id="'+row['id']+'">Verify</button></div></div></div></center>')
          }
      }
    })
  return false
})


$(document).on( 'click', '.verify', function(){
  var user_id = $(this).attr("user-id")
  var hold = $(this).attr("hold")
  $(this).html("<img src='../image/load.gif' style='width: 20px; height: 20px;'> Verifing...")
  $.ajax({
      context: this,
      type: "POST",
      url: path+"verify.php",
      data: {user_id : user_id, hold : hold},
         cache: false,
      success: function(resp) {
          if (resp == 1) {
            alert('Verified')
            $(this).hide()
          }
      }
  })

  return false
})



$(".email-form").submit(function(){
  $(".send").html("<img src='../image/load.gif' style='width: 20px; height: 20px;'> Sending...")
  $.ajax({
      context: this,
      type: "POST",
      url: path+"send-mail.php",
      data: new FormData(this),
      contentType: false,
         cache: false,
   processData:false,
      success: function(resp) {
        $(".run").click()
        $(".me").html(resp)
        $("input[name=subject]").val("")
        $("textarea[name=message]").val("")
        $(".send").html("Send")
      }
    })

  return false
})


$(".logout").click(function(){
  $(".run2").click()
  $(".me").html("<center><img src='../image/load.gif' style='width: 20px; height: 20px;'> Logging out...</center>")
  $.ajax({
      context: this,
      type: "POST",
      url: path+"logout.php",
      success: function(resp) {
        if (resp == 1) {
          location.href = "../index.html"
        } else {
          $(".me").html("Error Logging out try again")
        }
      }
    })
  return false
})