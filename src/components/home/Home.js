import "../../App.scss";

function Home() {
    return (
        <div className="home">
            <button className="primary" onClick={() => console.log("sup?")}>
                add new to do
            </button>
            <ul>
                <li>
                    <div className="todoo">
                        <div className={`bolletje ${"col-1"}`} />
                        <p>pick up translations</p>
                    </div>
                </li>
                <li>
                    <div className="todoo">
                        <div className={`bolletje ${"col-3"}`} />
                        <p>pick up Elif</p>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Home;
