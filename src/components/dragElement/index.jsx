import React, { Component } from 'react'
import './index.css'
import { DragSource } from 'react-dnd';

const ItemTypes = 'item';

const ItemSource = {
    beginDrag(props, monitor, component) {
        props.beginDrag(props.id)
        return {};
    },

    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            return;
        }
        props.endDrag()
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

export class DragElement extends Component {

    render() {
        const { connectDragSource, isDragging, item} = this.props;
        return connectDragSource(
            <div className='dragElement' style={{
                    opacity: isDragging ? 0.3 : 1
                }}>
                <img src={item.imgSrc} alt=""/>
                <div>{item.name}</div>
            </div>
        )
    }
}

const DragItem = DragSource(ItemTypes, ItemSource, collect)(DragElement);

export default DragItem
