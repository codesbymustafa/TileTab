const data = {
    flexbitlist : [
        {
            name : "Clock",
            import : [
                {
                    imports : ["useState", "useEffect"],
                    from : "react"
                }
            ],
            code : `
                () => {
      const [time, setTime] = useState(new Date().toLocaleTimeString());
      
      useEffect(() => {
        const t = setInterval(() => {
          setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(t);
      }, []);
      
      return (
        <div className="text-xl font-bold text-green-400">
          {time}
        </div>
      );
    }
            `
        },
        {
            name : "Google Search",
            import : [
                {
                    imports : ["useState"],
                    from : "react"
                },
                {
                    imports : ["Search"],
                    from : "lucide-react"
                }

            ],
            code : ""
        }
    ]
}

export default data;