import React, { Component } from 'react'
import { DropTarget } from 'react-dnd';
import './configDropBox.css'

const ItemTypes = 'item'
const itarget = {
    canDrop(props) {
        return props.canDrop(props.id);
    },
    drop(props) {
        props.move(props.id)
    }
};

function icollect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
}

export class ConfigBox extends Component {

    render() {
        const { connectDropTarget, isOver, item, canDrop } = this.props;
        return connectDropTarget(
            <div className='configDropBox'>
                <div className='dropBox'>
                    {this.props.children}
                    {isOver && canDrop ?
                        <div className='dropOver' /> : null
                    }
                    {isOver && !canDrop ?
                        < div className='dropOver noDrop' /> : null
                    }
                </div>
            </div>
        )
    }
}

const ConfigDropBox = DropTarget(ItemTypes, itarget, icollect)(ConfigBox)

export default ConfigDropBox
