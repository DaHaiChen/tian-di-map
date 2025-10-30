// 天地图API类型定义
export namespace TianDiTu {
    export interface LngLat {
        lng: number;
        lat: number;
        constructor(lng: number, lat: number): LngLat;
    }

    export interface MapEvent {
        lnglat?: LngLat;
        domEvent?: Event;
        [key: string]: any;
    }

    export interface Map {
        centerAndZoom(lnglat: LngLat, zoom: number): void;
        setZoom(zoom: number): void;
        getZoom(): number;
        setCenter(lnglat: LngLat): void;
        getCenter(): LngLat;
        addOverLay(overlay: any): void;
        removeOverLay(overlay: any): void;
        removeLayer(layer: any): void;
        addEventListener(eventType: string, callback: (event: MapEvent) => void): void;
        removeEventListener(eventType: string, callback: (event: MapEvent) => void): void;
        addLayer(layer: TileLayer): void;
        enableScrollWheelZoom(): void;
        getOverlays():any;
    }

    export interface TileLayer {
        constructor(url: string, options?: any): TileLayer;
    }

    export interface TileLayerWMS {
        constructor(url: string, config: any): TileLayerWMS;
    }

    export interface TMapStatic {
        Overlay: any;
        LngLat: new (lng: number, lat: number) => LngLat;
        Map: new (container: HTMLElement, options?: any) => Map;
        Polygon: new (points: LngLat[], style?: any) => any;
        Icon: new (options: any) => any;
        Point: new (x: number, y: number) => any;
        Marker: new (lnglat: LngLat, options?: any) => any;
        Label: new (options?: any) =>any;
        TileLayer: new (url: string, options?: any) => TileLayer;
    }
}

// 全局声明
declare global {
    interface Window {
        T: TianDiTu.TMapStatic;
    }
}


// geo数据模型
export interface GeoData {
  properties: any
  coordinates: []
}

// 地图属性接口
export interface MapProps {
    centerLng: number;
    centerLat: number;
    zoom: number;
    maxZoom: number;
    width: string;
    height: string;
    markerLng?: number;
    markerLat?: number;
    areaId: string;
    riskLevel: string;
    disabled: boolean;
    wmsUrl: string;
    wmsLayers: string;
}

// 地址信息接口
export interface AddressInfo {
    province?: string;
    city?: string;
    district?: string;
    detail?: string;
}

// 标记完成事件接口
export interface MarkCompletePayload {
    lng: number;
    lat: number;
    areaId: string;
    address: AddressInfo;
}

// 天气接口返回类型
export interface WeatherResponse {
    now: {
        text: string;
        windDir: string;
        windScale: string;
        temp: string;
        feelsLike: string;
    };
}

// 逆地理编码结果
export interface GeocodeResult {
    result: {
        formatted_address: string;
        location: {
            lon: number;
            lat: number;
        };
        addressComponent: {
            address: string;
            province?: string;
            city?: string;
            county?: string;
            road?: string;
            poi_position?: string;
            address_position?: string;
            road_distance?: number;
            poi?: string;
            poi_distance?: string;
            address_distance?: number;
        };
    };
    msg: string;
    status: string;
}

// 区域节点接口
export interface AreaNode {
    label: string;
    value: string;
    point: number[];
    geo: any[];
    children?: AreaNode[];
}

// WMS配置接口
export interface WmsConfig {
    url: string;
    layers: string;
    format: string;
    maxNativeZoom: number;
    transparent: boolean;
    version: string;
    srs: string;
    style: string;
}

// 区域标记数据接口
export interface AreaMarker {
    id: string;
    name: string;
    lng: number;
    lat: number;
    count: number;
    color: 'red' | 'blue' | 'green' | 'orange' | 'yellow';
    status?: 'normal' | 'warning' | 'danger';
}

// 点位标记数据接口
export interface PointMarker {
    id: string;
    name: string;
    lng: number;
    lat: number;
    icon: string;
}

// 区域标记点击事件载荷
export interface AreaMarkerClickPayload {
    marker: AreaMarker;
    event: MouseEvent;
}