import React, { Component } from 'react';
import { Row, Col, Select, Icon } from 'antd'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DropElement from '../dropElement/DropElement';
import update from 'immutability-helper';
import echartConfig from '../echartConfig';
import './index.css'

import au from '../../img/a.jpg';
import bu from '../../img/b.jpg';
import cu from '../../img/c.jpg';
import abcu from '../../img/abc.jpg';

import ConfigDropBox from '../configDropBox/ConfigDropBox'
import DragElement from '../dragElement'

const lineData = [
    { name: 'A相电压', imgSrc: au },
    { name: 'B相电压', imgSrc: bu },
    { name: 'C相电压', imgSrc: cu },
    { name: 'ABC相电压', imgSrc: abcu }
];

export class boardContainer extends Component {

    constructor(props) {
        super(props);
        this.dragEleMove = this.dragEleMove.bind(this);
        this.beginDrag = this.beginDrag.bind(this)
        this.canDrop = this.canDrop.bind(this)
        this.endDrag = this.endDrag.bind(this)
        this.delItem = this.delItem.bind(this)
        this.changeItem = this.changeItem.bind(this)
    }

    state = {
        activeId: '',
        activeDropId: '',
        itemList: lineData,
        chartType: 'line',
        dropConfig: echartConfig['line']
    }

    dragEleMove(id) {
        this.setState({ activeDropId: id })
    }

    beginDrag(id) {
        this.setState({ activeId: id })
    }

    canDrop(id) {

        return true
    }

    endDrag() {
        const { itemList, activeId, dropConfig, activeDropId } = this.state;
        const ilist = update(itemList, { $splice: [[activeId, 1]] })
        const dlist = update(dropConfig, { [activeDropId]: { items: { $push: [itemList[activeId]] } } })
        this.setState({ itemList: ilist, dropConfig: dlist })
    }

    delItem(item, pitem, pid) {
        const { itemList, dropConfig } = this.state;
        for (let i = 0; i < pitem.items.length; i++) {
            if (pitem.items[i].id === item.id) {
                pitem.items.splice(i, 1);
                break;
            }
        }
        const nlist = update(itemList, { $push: [item] })
        const dropList = update(dropConfig, { [pid]: { $set: pitem } })
        this.setState({ itemList: nlist, dropConfig: dropList })
    }


    changeItem(value, key, id, pid) {
        const { dropConfig } = this.state;
        const nitem = { ...dropConfig[pid].items[id] }
        nitem[key] = value;
        const dropList = update(dropConfig, { [pid]: { items: { [id]: { $set: nitem } } } })
        this.setState({ dropConfig: dropList })
    }

    render() {
        const { itemList, dropConfig } = this.state;
        // 左边待拖动组件
        const leftItems = itemList.map((item, idx) => {
            return (
                <div key={idx+"DragElement"} className="DragElementWrap">
                    <DragElement item={item} beginDrag={this.beginDrag} id={idx} endDrag={this.endDrag} />
                </div>
                
            )
        })
        // 右边待拖动组件
        const dropList = dropConfig.map((item, idx) => {
            const items = item.items.map((sitem, sid) => {
                return (
                    <div key={sid+"DropElement"}>
                        <DropElement item={sitem} pitem={item} pid={idx} delItem={this.delItem} changeItem={(value, key) => this.changeItem(value, key, sid, idx)} />
                    </div>
                    
                )
            })
            return (
                <div key={idx}>
                    <ConfigDropBox move={this.dragEleMove} item={item} id={idx} canDrop={this.canDrop}>
                        {items}
                    </ConfigDropBox>
                </div>
            )
        })
        return (
            <div className='boardContainer'>
                <div className='leftBox'>{leftItems}</div>
                <div className='rightBox'> {dropList} </div>
            </div>
        )
    }
}


export default DragDropContext(HTML5Backend)(boardContainer);