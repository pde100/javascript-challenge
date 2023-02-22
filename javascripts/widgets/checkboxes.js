function checkboxes(widget) {
    const controlBox = widget.querySelector('[kjs-role=control]');
    const relatedBoxes = widget.querySelectorAll('[kjs-role=related]');

    function setup() {
        controlBox.checked = false;
        controlBox.indeterminate = false;

        relatedBoxes.forEach((checkbox) => {
            checkbox.checked = false;
          });
    }

    function handleControlCheckboxChange() {
        let checkedCount = 0;
        let uncheckedCount = 0;

        relatedBoxes.forEach((checkbox) => {
        if (checkbox.checked) {
            checkedCount++;
        } else {
            uncheckedCount++;
        }
        });

        if (uncheckedCount != 0 && checkedCount != 0 && controlBox.checked) {
            controlBox.checked = false;
            relatedBoxes.forEach((checkbox) => {
                checkbox.checked = false;
              });
        } else if (controlBox.checked) {
          relatedBoxes.forEach((checkbox) => {
            checkbox.checked = true;
          });
        } else {
          relatedBoxes.forEach((checkbox) => {
            checkbox.checked = false;
          });
        }
        controlBox.indeterminate = false;
    }

    function handleRelatedCheckboxChange() {
        let checkedCount = 0;
        let uncheckedCount = 0;

        relatedBoxes.forEach((checkbox) => {
        if (checkbox.checked) {
            checkedCount++;
        } else {
            uncheckedCount++;
        }
        });

        if(checkedCount == 0) {
            controlBox.checked = false;
            controlBox.indeterminate = false;
        } else if(uncheckedCount == 0) {
            controlBox.checked = true;
            controlBox.indeterminate = false;
        } else {
            controlBox.checked = false;
            controlBox.indeterminate = true;
        }
    }

    let actions = [];

    controlBox.addEventListener('change', handleControlCheckboxChange);

    relatedBoxes.forEach((checkbox) => {
        actions.push({
        element: checkbox,
        event: 'change',
        handler: handleRelatedCheckboxChange
        });
    });

    return { setup, actions };

}
module.exports = checkboxes;


