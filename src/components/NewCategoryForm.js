function NewCategoryForm() {
    return (
        <div className="NewCategoryForm">
            <h2> New category </h2>
            <form>
                <label>
                    name
                    <input type="text" id="my-input" />
                </label>
            </form>
        </div>
    );
}

export default NewCategoryForm;
