import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';

var HOST = 'https://swastika.io'


export const ComponentType = {
    View: "View",
    ScrollView: "ScrollView",
    Text: "Text",
    Image: "Image",
    Button: "Button",
}

export const DataType = {
    string: "string",
    image_url: "image_url",
    object: "object",
    component: "component",
    object_array: "object_array"
}

export class CustomText extends React.Component {
    static propTypes = {
        styleName: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props)
        const { styleName, dataType, id, modelData, dataValue } = this.props;
        this.content = this.convertDataType(dataType, dataValue, modelData);
        this.key = id;
        this.style = props.getListStylesByStyleName(styleName);
    }

    convertDataType(type, dataValue, modelData) {
        switch (type) {
            case DataType.string:
                return dataValue;
            case DataType.object:
                var data
                if (modelData && dataValue) {
                    let keyProp = dataValue.split('.');
                    if (keyProp.lenght > 0) {
                        if (keyProp[0].indexOf('@') >= 0) {
                            delete keyProp[0];
                            //Need Edit **************************
                            data = modelData;
                        } else {
                            data = modelData;
                        }
                        for (let key of keyProp) {
                            data = data[key.toLowerCase()];
                        }
                    }
                }
                return data ? data : "";
            default:
                return "";
        }
    }

    render = () => {
        return (
            <Text key={this.key} style={this.style}>{this.content}</Text>
        );
    }
}


export class CustomView extends React.Component {
    static propTypes = {
        styleName: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props)
        const { styleName, dataType, id, modelData, dataValue, dataSource } = this.props;
        this.content = this.convertDataType(dataType, dataValue, modelData);
        this.dataSource = dataSource;
        this.key = id;
        this.style = props.getListStylesByStyleName(styleName);
        //Lọc style properties cho View
        for (let styleChild of this.style) {
            if (styleChild.hasOwnProperty('color')) {
                styleChild['backgroundColor'] = styleChild['color']
                delete styleChild['color']
            }
        }
    }

    convertDataType(type, dataValue, modelData) {
        switch (type) {
            case DataType.component:
                return modelData;
            case DataType.object_array:
                var data
                if (modelData && dataValue) {
                    let keyProp = dataValue.split('.');
                    if (keyProp.lenght > 0) {
                        if (keyProp[0].indexOf('@') >= 0) {
                            delete keyProp[0];
                            //Need Edit **************************
                            data = modelData;
                        } else {
                            data = modelData;
                        }
                        for (let key of keyProp) {
                            data = data[key.toLowerCase()];
                        }
                    }
                }
                return data ? data : "";
            default:
                return "";
        }
    }

    render = () => {
        return (
            <View key={this.key} style={this.style}>
                {this.props.generateTag(this.dataSource, this.content)}
            </View>
        );
    }
}

export class CustomImage extends React.Component {
    static propTypes = {
        styleName: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props)
        const { styleName, dataType, id, modelData, dataValue, dataSource } = this.props;
        this.content = this.convertDataType(dataType, dataValue, modelData);
        this.key = id;
        this.style = props.getListStylesByStyleName(styleName);
    }

    convertDataType(type, dataValue, modelData) {
        switch (type) {
            case DataType.component:
                return modelData;
            case DataType.image_url:
                return dataValue;
            default:
                return "";
        }
    }

    converImageURL(image) {
        return HOST + image
    }

    render = () => {
        return (
            <Image key={this.key} style={this.style}
                source={{ uri: this.converImageURL(this.content) }} />
        );
    }
}


const temp = {
    "componentType": "View",
    "styleName": "about-description text-center",
    "id": 1,
    "dataType": "component",
    "dataValue": null,
    "dataSource": [
        {
            "componentType": "View",
            "styleName": "features-3",
            "id": 2,
            "dataType": "component",
            "dataValue": null,
            "dataSource": [
                {
                    "componentType": "View",
                    "styleName": "container",
                    "id": 8,
                    "dataType": "component",
                    "dataValue": null,
                    "dataSource": [
                        {
                            "componentType": "View",
                            "styleName": "row",
                            "id": 3,
                            "dataType": "component",
                            "dataValue": null,
                            "dataSource": [
                                {
                                    "componentType": "Text_header2",
                                    "styleName": "title",
                                    "id": 1,
                                    "dataType": "object",
                                    "dataValue": "@Model.title",
                                    "dataSource": []
                                },
                                {
                                    "componentType": "Text_header4",
                                    "styleName": "description",
                                    "id": 2,
                                    "dataType": "object",
                                    "dataValue": "description",
                                    "dataSource": []
                                }
                            ]
                        },
                        {
                            "componentType": "View",
                            "styleName": "row",
                            "id": 4,
                            "dataType": "object_array",
                            "dataValue": "Model.Data.Items",
                            "dataSource": [
                                {
                                    "componentType": "View",
                                    "styleName": "col-md-4",
                                    "id": 5,
                                    "dataType": "component",
                                    "dataValue": null,
                                    "dataSource": [
                                        {
                                            "componentType": "View",
                                            "styleName": "info info-hover",
                                            "id": 6,
                                            "dataType": "component",
                                            "dataValue": null,
                                            "dataSource": [
                                                {
                                                    "componentType": "View",
                                                    "styleName": "icon icon-success icon-circle",
                                                    "id": 7,
                                                    "dataType": "component",
                                                    "dataValue": null,
                                                    "dataSource": [
                                                        {
                                                            "componentType": "Image",
                                                            "styleName": "now-ui-icons",
                                                            "id": 6,
                                                            "dataType": "image_assets",
                                                            "dataValue": "../../assets/icons/iconPlus.png",
                                                            "dataSource": []
                                                        }
                                                    ]
                                                },
                                                {
                                                    "componentType": "Text_header4",
                                                    "styleName": "info-title",
                                                    "id": 5,
                                                    "dataType": "object",
                                                    "dataValue": "title",
                                                    "dataSource": []
                                                },
                                                {
                                                    "componentType": "Text",
                                                    "styleName": "description",
                                                    "id": 5,
                                                    "dataType": "object",
                                                    "dataValue": "excerpt",
                                                    "dataSource": []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}