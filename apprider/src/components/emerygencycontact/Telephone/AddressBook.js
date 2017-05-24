import React from 'react';

import AddressBookGroup from './AddressBookGroup';//通讯录分组

class AddressBook extends React.Component{

	constructor(props) {
		super(props);
		this.state={source:[]};
	}
	componentWillReceiveProps (nextProps) {
		this.setState({source:nextProps.datas});
	}
	searchBook(event){
		let value=event.target.value;
		if(value===""){
			this.setState({source:this.props.datas});
		}else{
			//匹配值
			let newSource=[];
			if(this.props.datas.length>0){
				for(let i=0;i<this.props.datas.length;i++){
					let curData=this.props.datas[i];
					let tmpData={key:curData.key,datas:[]};
					for(let j=0;j<curData.datas.length;j++){
						let curName=curData.datas[j];
						if(curName.name.indexOf(value)!==-1){
							tmpData.datas.push(curName);
						}
					}
					newSource.push(tmpData);
				}
			}
			this.setState({source:newSource});
		}
	}
	componentWillMount () {
		this.setState({source:this.props.datas});
	}
	render(){
		let {gotoTelephoneABDetailHandler} = this.props;//获取容器传递来的参数
		return (
			<div>
				<div className="padding" style={{backgroundColor:"#ccc"}}>
					<label className="item item-input" style={{paddingTop:"0px",paddingBottom:"0px"}}>
						<i className="icon ion-search placeholder-icon"></i>
						<input type="text" placeholder="输入字母、汉字或电话号码搜索" onChange={ this.searchBook.bind(this) } style={{paddingTop:"0px",paddingBottom:"0px"}} />
					</label>
				</div>
				<div className="userlist_">

					{
						this.state.source.map((curData,index)=>{
							if(curData.datas.length>0){
								return <AddressBookGroup key={ "adbook"+index }
										data={curData}
										gotoTelephoneABDetailHandler={gotoTelephoneABDetailHandler}
									/>
							}
							return null;
						})
					}
				</div>
			</div>
		);
	}
}
export default AddressBook;
