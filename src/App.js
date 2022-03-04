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
                deprecated: false,
            },
            {
                id: "cat-02",
                desc: "professional",
                color: "col-2",
                deprecated: false,
            },
            {
                id: "cat-03",
                desc: "kids",
                color: "col-3",
                deprecated: false,
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
        this.setState({
            categories: [
                ...this.state.categories,
                {
                    id: `cat-${this.state.categories.length + 1}`,
                    desc: categoryName,
                    color: color,
                    deprecated: false,
                },
            ],
        });
    };

    onEditCategory = (id, newName) => {
        const updatedCategories = this.state.categories.map((category) => {
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
    };

    onDeleteCategory = (id) => {
        const updatedCategories = this.state.categories.map((category) => {
            if (category.id === id) {
                return {
                    ...category,
                    deprecated: true,
                };
            } else {
                return category;
            }
        });
        this.setState({
            categories: updatedCategories,
        });
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
                    onDeleteCategory={this.onDeleteCategory}
                />
                {/* <CategoryForm categories={this.state.categories} /> */}
            </div>
        );
    }
}
export default App;
