import React from "react";
import "./App.scss";
import { Home, Menu, Settings } from "./components";

class App extends React.Component {
    state = {
        isMenuOpen: false,
        categories: [
            {
                id: "cat-01",
                desc: "personal",
                color: "col-1",
            },
            {
                id: "cat-02",
                desc: "professional",
                color: "col-2",
            },
            {
                id: "cat-03",
                desc: "kids",
                color: "col-3",
            },
        ],
        colors: [
            {
                id: "col-1",
            },
            {
                id: "col-2",
            },
            {
                id: "col-3",
            },
            {
                id: "col-4",
            },
            {
                id: "col-5",
            },
            {
                id: "col-6",
            },
            {
                id: "col-7",
            },
            {
                id: "col-8",
            },
            {
                id: "col-9",
            },
            {
                id: "col-10",
            },
            {
                id: "col-11",
            },
            {
                id: "col-12",
            },
            {
                id: "col-13",
            },
            {
                id: "col-14",
            },
        ],
    };

    onToggleMenu = () => {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    };

    onAddCategory = (categoryName, color) => {
        console.log(categoryName, color);
        this.setState({
            categories: [
                ...this.state.categories,
                { id: "", desc: categoryName, color: color },
            ],
        });
    };

    onEditCategory = (id, newName) => {
        console.log(id, newName);
        console.log(this.state.categories);
        const updatedCategories = this.state.categories.map((category) => {
            console.log(category.id === id);
            if (category.id === id) {
                return {
                    ...category,
                    desc: newName,
                };
            } else {
                return category;
            }
        });
        this.setState({
            categories: updatedCategories,
        });
        console.log(updatedCategories);
    };

    render() {
        return (
            <div className="App">
                <Menu
                    isMenuOpen={this.state.isMenuOpen}
                    onToggleMenu={this.onToggleMenu}
                />
                {/*  <Home /> */}
                <Settings
                    categories={this.state.categories}
                    onAddCategory={this.onAddCategory}
                    onEditCategory={this.onEditCategory}
                    colors={this.state.colors}
                />
                {/* <CategoryForm categories={this.state.categories} /> */}
            </div>
        );
    }
}
export default App;
