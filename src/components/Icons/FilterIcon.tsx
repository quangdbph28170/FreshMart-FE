import Icon from '@ant-design/icons';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const svg = () => (
   <svg viewBox='0 0 24 24' fill='currentColor' width='1rem' height='1rem'>
      <path d='M10,11.7071068 L5.29289322,7 C5.10535684,6.81246362 5,6.55810971 5,6.29289322 L5,5 C5,4.44771525 5.44771525,4 6,4 L18,4 C18.5522847,4 19,4.44771525 19,5 L19,6.29289322 C19,6.55810971 18.8946432,6.81246362 18.7071068,7 L14,11.7071068 L14,17.7675919 L10.7773501,19.9160251 C10.449325,20.1289261 10,19.9160251 10,19.5 L10,11.7071068 Z M6,5 L6,6.29289322 L11,11.2928932 L11,18.5657415 L13,17.2324081 L13,11.2928932 L18,6.29289322 L18,5 L6,5 Z'></path>
   </svg>
);

const FilterIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={svg} {...props} />;

export default FilterIcon;
