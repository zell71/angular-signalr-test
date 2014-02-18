using System;
using System.Threading;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace MvcApplication2.SignalRHubs
{
    public class HelloWorld
    {
        // Singleton instance
        private readonly static Lazy<HelloWorld> _instance = new Lazy<HelloWorld>(
            () => new HelloWorld(GlobalHost.ConnectionManager.GetHubContext<HelloWorldHub>().Clients));

        private readonly TimeSpan _updateInterval = TimeSpan.FromMilliseconds(2500);
        private readonly Random _updateOrNotRandom = new Random();
        private Timer _timer;

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

        private void UpdateInterface(object state)
        {
            Clients.All.acceptGreet("Good morning! The time is " + DateTime.Now.ToString("MM/dd/yy H:mm:ss"));
        }

        public void BeginTicker()
        {
            _timer = new Timer(UpdateInterface, null, _updateInterval, _updateInterval);
        }
    }
}