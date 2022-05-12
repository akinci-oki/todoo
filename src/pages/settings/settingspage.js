import React, { useState } from "react";
import { Settings } from "../../components";
function Settingspage() {
    const [categories, setCategories] = useState([
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
    ]);
    const [colors, setColors] = useState([
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
    ]);

    const onAddCategory = (categoryName, color) => {
        setCategories([
            ...categories,
            {
                id: `cat-${categories.length + 1}`,
                desc: categoryName,
                color: color,
                deprecated: false,
            },
        ]);
    };

    const onEditCategory = (id, newName) => {
        const updatedCategories = categories.map((category) => {
            if (category.id === id) {
                return {
                    ...category,
                    desc: newName,
                };
            } else {
                return category;
            }
        });
        setCategories(updatedCategories);
    };

    const onDeleteCategory = (id) => {
        const updatedCategories = categories.map((category) => {
            if (category.id === id) {
                return {
                    ...category,
                    deprecated: true,
                };
            } else {
                return category;
            }
        });
        setCategories(updatedCategories);
    };
    return (
        <div className="settingspage">
            <Settings
                categories={categories}
                onAddCategory={onAddCategory}
                onEditCategory={onEditCategory}
                colors={colors}
                onDeleteCategory={onDeleteCategory}
            />
        </div>
    );
}

export default Settingspage;
