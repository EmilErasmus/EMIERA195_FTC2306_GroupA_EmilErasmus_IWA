import { createOrderHtml, html, updateDraggingHtml, moveToColumn } from './view.js'
import { createOrderData, updateDragging } from './data.js'

let editedColumn = null;
/**
 * A handler that fires when a user drags over any element inside a column. In
 * order to determine which column the user is dragging over the entire event
 * bubble path is checked with `event.path` (or `event.composedPath()` for
 * browsers that don't support `event.path`). The bubbling path is looped over
 * until an element with a `data-area` attribute is found. Once found both the
 * active dragging column is set in the `state` object in "data.js" and the HTML
 * is updated to reflect the new column.
 *
 * @param {Event} event 
 */
const handleDragOver = (event) => {
    event.preventDefault();
    const path = event.path || event.composedPath()
    let column = null

    for (const element of path) {
        const { area } = element.dataset
        if (area) {
            column = area
            break;
        }
    }

    if (!column) return
    updateDragging({ over: column })
    updateDraggingHtml({ over: column })
    editedColumn = column
}

const handleDragStart = (event) => {
    console.log("I'm here too!");
};

const handleDragEnd = (event) => {
    event.preventDefault();
    const currentOrderId = event.target.closest('.order').getAttribute('data-id');
    const targetColumn = editedColumn;
    const orderedColumn = document.querySelector(`section[data-area="${targetColumn}"]`);

    if (currentOrderId && targetColumn) {
        moveToColumn(currentOrderId, targetColumn);
    }

    orderedColumn.style = "";
};

/**
 * A handler that takes the dialog element's "open" property and sets it to
 * true if false and false if true, displaying the dialog overlay or hiding it.
 * 
 * @param {Event} event 
 */
const handleHelpToggle = (event) => {
    const isHelpOpen = html.help.overlay;
    isHelpOpen.open ? isHelpOpen.open = false : isHelpOpen.open = true;
    html.other.add.focus();
};

/**
 * A handler that displays the "data-add-overlay" dialog element, puts the focus
 * on the "Add order" button and resets the form if cancel is clicked
 * 
 * @param {Event} event 
 */
const handleAddToggle = (event) => {
    const isAddOpen = html.add.overlay;
    if (isAddOpen.open) {
        isAddOpen.open = false;
        html.add.form.reset();
        html.other.add.focus();
    } else isAddOpen.open = true;
};


/**
 * A handler that takes the form submission data, gets it in object form with
 * the createOrderData() function, and then passes it into the createOrderHtml()
 * function to get the form inputs in html format.
 *
 * @param {Event} event 
 */
const handleAddSubmit = (event) => {
    event.preventDefault();
    const table = html.add.table.value;
    const title = html.add.title.value;
    const column = 'ordered';
    
    const orderData = createOrderData({ table, title, column });
    const orderElement = html.columns.ordered;

    orderElement.appendChild(createOrderHtml(orderData));
    html.add.overlay.open = false;
    html.add.form.reset();
};

const handleEditToggle = (event) => {
    const targetOrder = event.target.closest('.order');
    const isEditOpen = html.edit.overlay;

    if (isEditOpen.open) {
        isEditOpen.open = false;
    }

    if (targetOrder) {
        isEditOpen.open = true;
        const orderId = targetOrder.getAttribute('data-id');
        const orderTitle = targetOrder.querySelector('.order__title').textContent;
        const orderTable = targetOrder.querySelector('.order__value[data-order-table]').textContent;
        const orderedColumn = targetOrder.parentNode.getAttribute('data-column');

        html.edit.title.value = orderTitle;
        html.edit.table.value = orderTable;
        html.edit.id.value = orderId;
        html.edit.column.value = orderedColumn;
    };
};

const handleEditSubmit = (event) => {
    event.preventDefault();
    const currentOrderId = html.edit.id.value
    const currentTitleElement = document.querySelector(`[data-id="${currentOrderId}"] .order__title`);
    const currenttableElement = document.querySelector(`[data-id="${currentOrderId}"] .order__value[data-order-table]`);

    const editedTitle = html.edit.title.value;
    const editedTable = html.edit.table.value
    const editeColumn = html.edit.column.value;

    currentTitleElement.innerText = editedTitle;
    currenttableElement.innerText = editedTable;

    moveToColumn(currentOrderId, editeColumn);

    html.edit.overlay.open = false;
}

const handleDelete = (event) => {
    const currentOrderId = html.edit.id.value;
    const currentOrderElement = document.querySelector(`[data-id="${currentOrderId}"]`);

    currentOrderElement.remove();

    html.edit.overlay.open = false;
}


html.add.cancel.addEventListener('click', handleAddToggle)
html.other.add.addEventListener('click', handleAddToggle)
html.add.form.addEventListener('submit', handleAddSubmit)

html.other.grid.addEventListener('click', handleEditToggle)
html.edit.cancel.addEventListener('click', handleEditToggle)
html.edit.form.addEventListener('submit', handleEditSubmit)
html.edit.delete.addEventListener('click', handleDelete)

html.help.cancel.addEventListener('click', handleHelpToggle)
html.other.help.addEventListener('click', handleHelpToggle)


for (const htmlColumn of Object.values(html.columns)) {
    htmlColumn.addEventListener('dragstart', handleDragStart)
    htmlColumn.addEventListener('dragend', handleDragEnd)
}

for (const htmlArea of Object.values(html.area)) {
    htmlArea.addEventListener('dragover', handleDragOver)
}