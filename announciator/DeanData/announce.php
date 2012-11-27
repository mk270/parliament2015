@{
var dataFile = Server.MapPath("FRAME_1420-22112012.txt");
Array userData = File.ReadAllLines(dataFile);
}

<!DOCTYPE html>
<html>
<body>

<h1>Reading Data from a File</h1>
@foreach (string dataLine in userData) 
{
foreach (string dataItem in dataLine.Split(',')) 
{
@dataItem <text>&nbsp;</text>}
<br>
}

</body>
</html>
