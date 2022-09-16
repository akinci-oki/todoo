import React, { useState } from "react";
import { Settings } from "../../components";
import { lists as importedLists } from "../../lists";

function Settingspage() {
    const [lists, setLists] = useState(importedLists);
    const [colors] = useState([
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

    const onAddList = (listName, color) => {
        setLists([
            ...lists,
            {
                id: `list-${lists.length + 1}`,
                desc: listName,
                color,
                deprecated: false,
            },
        ]);
    };

    const onEditList = (id, newName) => {
        const updatedLists = lists.map((list) => {
            if (list.id === id) {
                return {
                    ...list,
                    desc: newName,
                };
            } else {
                return list;
            }
        });
        setLists(updatedLists);
    };

    const onDeleteList = (id) => {
        const updatedLists = lists.map((list) => {
            if (list.id === id) {
                return {
                    ...list,
                    deprecated: true,
                };
            } else {
                return list;
            }
        });
        setLists(updatedLists);
    };
    return (
        <div className="settingspage">
            <Settings
                lists={lists}
                onAddList={onAddList}
                onEditList={onEditList}
                colors={colors}
                onDeleteList={onDeleteList}
            />
        </div>
    );
}

export default Settingspage;
