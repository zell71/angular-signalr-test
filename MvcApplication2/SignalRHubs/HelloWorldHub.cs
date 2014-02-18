using System;
using Microsoft.AspNet.SignalR;

namespace MvcApplication2.SignalRHubs
{
    public class HelloWorldHub : Hub
    {
        private readonly HelloWorld _helloWorld;

        public HelloWorldHub() : this(HelloWorld.Instance) { }

        public HelloWorldHub(HelloWorld helloWorld)
        {
            _helloWorld = helloWorld;
        }

        public void GreetAll()
        {
            _helloWorld.SendAcceptGreet();
        }

        public void StartTicker()
        {
            _helloWorld.BeginTicker();
        }
    }
}