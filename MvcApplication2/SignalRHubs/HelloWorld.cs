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
        private volatile TickerState _tickerState;

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

        public TickerState TickerState
        {
            get { return _tickerState; }
            private set { _tickerState = value; }
        }

        public void SendAcceptGreet(string message)
        {
            Clients.All.acceptGreet(message);
        }

        private void UpdateInterface(object state)
        {
            Clients.All.acceptGreet("Ticker Started " + DateTime.Now.ToString("MM/dd/yy H:mm:ss"));
        }

        private void StopMessage()
        {
            Clients.All.acceptGreet("Ticker Stopped " + DateTime.Now.ToString("MM/dd/yy H:mm:ss"));
        }

        public void BeginTicker()
        {
            if (TickerState != TickerState.Open)
            {
                _timer = new Timer(UpdateInterface, null, _updateInterval, _updateInterval);
                TickerState = TickerState.Open;
            }            
        }

        public void StopTicker()
        {
            if (TickerState == TickerState.Open)
            {
                if (_timer != null)
                {
                    _timer.Dispose();
                }
                TickerState = TickerState.Closed;
                StopMessage();
            }
        }
    }

    public enum TickerState
    {
        Closed,
        Open
    }
}