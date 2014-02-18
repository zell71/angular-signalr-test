using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(MvcApplication2.Startup), "Configuration")]
namespace MvcApplication2
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}