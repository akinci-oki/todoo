import "../../App.scss";

import { ReactComponent as GitHubIcon } from "../../icons/GitHub-icon.svg";

function About() {
    return (
        <div className="About">
            <h2>About</h2>
            <p>
                Welcome on my TO DO app. It’s my Hello World project that got a
                bit out of hand :)
            </p>
            <p> It allowed me to dive deep into:</p>
            <div>
                <ul>
                    <li>React, JavaScript & SCSS</li>
                    <li>Jira & Figma</li>
                    <li>react-router-dom</li>
                    <li>dealing with forms</li>
                    <li>fonts</li>
                    <li> ...</li>
                </ul>
            </div>
            <div>
                <a href="https://github.com/akinci-oki/todoo">
                    <button>
                        repository
                        <span>
                            <GitHubIcon />
                        </span>
                    </button>
                </a>
            </div>
            <div>
                <h3>Warning!</h3>
                <p>
                    Please note that this is a playground app. Your data is not
                    protected, don’t share personal todos or e-mail addresses.
                </p>
            </div>
        </div>
    );
}

export default About;
