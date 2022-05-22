import './style.css';

class DraggableScrollArea {
    private element: HTMLElement;
    private isGrabbed = false;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.classList.add('draggable-area');

        this.element.addEventListener('mousedown', this.onMouseDown);
        this.element.addEventListener('mousemove', this.onMouseMove);
        this.element.addEventListener('mouseup', this.onMouseUp);
        this.element.addEventListener('mouseleave', this.onMouseUp);
    }

    public forwards = (): void => {
        this.changeStep(1);
    }

    public backwards = (): void => {
        this.changeStep(-1);
    }

    private changeStep = (direction: number): void => {
        this.element.scrollLeft += (this.element.clientWidth / 1.5) * direction;
        this.element.scrollTop += (this.element.clientHeight / 1.5) * direction;
    }

    private onMouseDown = (): void => {
        this.element.classList.add('grabbing');
        this.isGrabbed = true;
    };

    private onMouseMove = (event: MouseEvent): void => {
        if (!this.isGrabbed) return;

        this.element.scrollLeft = this.element.scrollLeft - event.movementX;
        this.element.scrollTop = this.element.scrollTop - event.movementY;
    };

    private onMouseUp = (): void => {
        this.element.classList.remove('grabbing');
        this.isGrabbed = false;
    };
}

export default DraggableScrollArea;