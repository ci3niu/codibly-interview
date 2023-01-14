export interface DataObject {
  color: string;
  id: number;
  name: string;
  pantone_value: string;
  year: number;
}

export interface Data {
  data: DataObject[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}
