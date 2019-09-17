import React, { Component } from 'react'
import { Icon } from 'antd'
import {nameToimgSrc} from '../../map/nameToimgSrc';
import './dropElement.css'


const YItem = ({ item, delItem, pitem, pid, changeItem }) => {
    return (
        <div key={pid} className='yItem'>
            {item.name}  <div><img src={nameToimgSrc[item.name]}></img></div>
            {/* <Icon type="close" className='icon' onClick={() => delItem(item, pitem, pid)} /> */}
        </div>
    )
}

export class DropElement extends Component {

    render() {
        const dropItem = this.props.pitem.dropItem;
        return (
            <div className='dropElement'>
                {dropItem === 2 ? <YItem {...this.props} /> : null}
            </div>
        )
    }
}

export default DropElement
