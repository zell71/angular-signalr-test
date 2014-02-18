using System;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace MvcApplication2.SignalRHubs
{
    public class HelloWorld
    {
        // Singleton instance
        private readonly static Lazy<HelloWorld> _instance = new Lazy<HelloWorld>(
            () => new HelloWorld(GlobalHost.ConnectionManager.GetHubContext<HelloWorldHub>().Clients));

        private HelloWorld(IHubConnectionContext clients)
        {
            Clients = clients;
        }

        public static HelloWorld Instance
        {
            get
            {
                return _instance.Value;
            }
        }

        private IHubConnectionContext Clients
        {
            get;
            set;
        }

        public void SendAcceptGreet()
        {
            Clients.All.acceptGreet("Good morning! The time is " + DateTime.Now.ToString("MM/dd/yy H:mm:ss"));
        }
    }
}