<!DOCTYPE html>
<html>
  <head>
    <title><?php echo $title; ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link href="../lib/bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="../lib/jasny-bootstrap-3.1.3-dist/jasny-bootstrap/css/jasny-bootstrap.min.css" rel="stylesheet" media="screen">
	<link href="../style.css" rel="stylesheet" media="screen">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
	<nav class="navmenu navmenu-default navmenu-fixed-left offcanvas-sm offcanvas-xs" role="navigation">
	  <a class="navmenu-brand">DiVA</a>
	  <ul id="leftmenu" class="nav navmenu-nav">
	  </ul>
	</nav>

    <div class="navbar navbar-default navbar-fixed-top hidden-md hidden-lg">
      <button type="button" class="navbar-toggle visible-sm visible-xs" data-toggle="offcanvas" data-target=".navmenu">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand">DiVA</a>
    </div>

	<div id="map"></div>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://code.jquery.com/jquery.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="../lib/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
    <script src="../lib/jasny-bootstrap-3.1.3-dist/jasny-bootstrap/js/jasny-bootstrap.min.js"></script>
    
	<!-- Map functions -->
	<script src="../mapfunctions.js"></script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAZIotYsEcDMzxEDVwmhoDJGcvnS2ZuHFw&callback=loadMapData">
    </script>
	
  </body>
</html>