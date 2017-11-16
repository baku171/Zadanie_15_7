class Stopwatch extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            running: false,
            resultList: [],
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        };
        this.reset();
        this.print(this.state.times);
    }

    reset() {
        this.state.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }

    print() {
        // this.display.innerText = this.format(this.state.times);
    }

    format(times) {
        return `${this.pad0(times.minutes)}:${this.pad0(times.seconds)}:${this.pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.state.running) {
            this.state.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.state.running) return;
        this.calculate();
        this.print();
    }

    calculate() {
        this.state.times.miliseconds += 1;
        if (this.state.times.miliseconds >= 100) {
            this.state.times.seconds += 1;
            this.state.times.miliseconds = 0;
        }
        if (this.state.times.seconds >= 60) {
            this.state.times.minutes += 1;
            this.state.times.seconds = 0;
        }
    }

    stop() {
        if (this.running) {
            this.running = false;
            clearInterval(this.watch);
        }
    }

    zero() {
        if (!this.running) {
            this.reset();
            this.print();
        }
    }

    pad0(value) {
        let result = value.toString();
        if (result.length < 2) {
            result = '0' + result;
        }
        return result;
    }

    save() {
        this.addTimeToList(this.format(this.state.times), resultList);
    }

    addTimeToList(time) {
        let element = [...this.state.resultList, time]
        this.setState ({
            resultList: element
        })
    }

    clear() {
        if (this.running) {
            this.stop();
            this.zero();
        }
        this.clearList(resultList);
    }

    clearList()  {
        this.setState ({
            resultList: []
        });
    }

    render() {
        return (
            <div>
                <div className='controls'>
                    <a href='#' className='button' onClick={this.start.bind(this)}>Start</a>
                    <a href='#' className='button' onClick={this.stop.bind(this)}>Stop</a>
                    <a href='#' className='button' onClick={this.zero.bind(this)}>Reset</a>
                    <a href='#' className='button' onClick={this.save.bind(this)}>Zapisz</a>
                    <a href='#' className='button' onClick={this.clear.bind(this)}>Wyczyść</a>
                </div>
                <div>{
                    this.state.times.miliseconds
                }
                </div>
                <ol className='results'>
                    {
                        this.state.resultList
                        // var moviesElements = movies.map(function(movie) {
                        //     return React.createElement(Movie, {
                        //         key: movie.id,
                        //         movie: movie
                        //     });
                        // });
                    }
                </ol>
            </div>
        );
    }
}


// const stopwatch = new Stopwatch (document.querySelector('.stopwatch'));
var resultList = document.querySelector('.results');

ReactDOM.render(<Stopwatch/>,document.querySelector('.stopwatch'))


