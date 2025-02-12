import React from "react";
import { Link } from "react-router-dom";
import "./styles/journal.css";


export default function Journal() {
    return (
        <div>
            <header>
                <h1>Life Hack Journal</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/journal">Journal</Link></li>
                        <li><Link to="/schedule">Schedule</Link></li>
                        <li><Link to="/goal">Goals</Link></li>
                    </ul>
                </nav>
                <img src={placeholderImage} alt="Placeholder" />
            </header>

            <main>
                <h2>Calendar</h2>
                <table border="1" style="width: 100%; text-align: center;">
                    <thead>
                        <tr>
                            <th>Sun</th>
                            <th>Mon</th>
                            <th>Tue</th>
                            <th>Wed</th>
                            <th>Thu</th>
                            <th>Fri</th>
                            <th>Sat</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>6</td>
                            <td>7</td>
                            <td>8</td>
                            <td>9</td>
                            <td>10</td>
                            <td>11</td>
                        </tr>
                        <tr>
                            <td>12</td>
                            <td>13</td>
                            <td>14</td>
                            <td>15</td>
                            <td>16</td>
                            <td>17</td>
                            <td>18</td>
                        </tr>
                        <tr>
                            <td>19</td>
                            <td>20</td>
                            <td>21</td>
                            <td>22</td>
                            <td>23</td>
                            <td>24</td>
                            <td>25</td>
                        </tr>
                        <tr>
                            <td>26</td>
                            <td>27</td>
                            <td>28</td>
                            <td>29</td>
                            <td>30</td>
                            <td>31</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

                <h2>Google Calender API</h2>
                {/* tables are replace by this API */}

                <h2>Write your Daily Journal</h2>
                <textarea placeholder="Write your day here..." rows="10" cols="50"></textarea>
                <button>Save Entry</button>

                <h2>DataBase</h2>

            </main>

            <footer>
                <p>&copy; 2025 Life Hack Journal</p>
            </footer>
        </div>
    );
}
