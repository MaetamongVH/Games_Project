import homeScreen from "./home.js";
const setScreen = function(screen)
{
    document.getElementById("app").innerHTML = screen.content;
    screen.onload();
}
setScreen(homeScreen);

export default setScreen;