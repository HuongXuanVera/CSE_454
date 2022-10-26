export interface  FILEVIDEO  {
    hour?: number;
    group:CHILDVIDEO[];
  }
  export interface CHILDVIDEO {
    fileName: string;
    url: string;
    subtitle: string;
    hasData:boolean;
    hour: number;
  }