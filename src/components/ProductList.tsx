'use client';
import React from 'react';
import { removeProduct, toggleProduct, editProduct } from '@/redux/features/product-slice';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Dropdown, Menu, Input as AntInput, Checkbox, Tooltip, Modal, Form, Select } from 'antd';
import { EditOutlined, DeleteFilled } from '@ant-design/icons';

const { Search } = AntInput;
const { Option } = Select;

const ProductList = () => {
  const { list } = useSelector((state: RootState) => state.ProductReducer);
  const dispatch = useDispatch<AppDispatch>();

  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');
  const [editProductModal, setEditProductModal] = React.useState<{
    visible: boolean;
    ProductId?: number;
  }>({
    visible: false,
  });
  const [editedProduct, setEditedProduct] = React.useState<{ name: string; type: string }>({
    name: '',
    type: '',
  });
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [selectedType, setSelectedType] = React.useState<string | undefined>(undefined);

  const sortedList = React.useMemo(() => {
    const filteredList = list.filter(
      (Product) =>
        Product.name.toLowerCase().includes(searchValue.toLowerCase()) &&
        (selectedType === undefined || Product.type === selectedType)
    );

    const sorted = [...filteredList];
    sorted.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    return sorted;
  }, [list, sortOrder, searchValue, selectedType]);


  const handleDelete = (id: number) => {
    dispatch(removeProduct(id));
  };

  const handleSort = (order: 'asc' | 'desc') => {
    setSortOrder(order);
  };

  const handleEditModalOpen = (id: number) => {
    const ProductToEdit = list.find((Product) => Product.id === id);

    if (ProductToEdit) {
      setEditedProduct({ name: ProductToEdit.name, type: ProductToEdit.type || '' });
      setEditProductModal({ visible: true, ProductId: id });
    }
  };

  const handleEditModalClose = () => {
    setEditProductModal({ visible: false, ProductId: undefined });
  };

  const handleEditProductSubmit = () => {
    if (editProductModal.ProductId !== undefined) {
      // Dispatch the editProduct action with the updated name and type
      dispatch(editProduct({ id: editProductModal.ProductId, name: editedProduct.name, type: editedProduct.type }));
      // Close the modal
      handleEditModalClose();
    }
  };

  const columns = [
    {
      title: (
        <div>
          Product{' '}
          <Dropdown
            overlay={
              <Menu onClick={({ key }) => handleSort(key as 'asc' | 'desc')}>
                <Menu.Item key="asc">Sort A-Z</Menu.Item>
                <Menu.Item key="desc">Sort Z-A</Menu.Item>
              </Menu>
            }
          >
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              &#x25BC;
            </a>
          </Dropdown>
        </div>
      ),
      dataIndex: 'name',
      key: 'name',
      sorter: (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      filters: list
        .map((Product) => Product.type)
        .filter((value, index, self) => self.indexOf(value) === index)
        .map((type) => ({ text: type, value: type })),
      onFilter: (value: any, record: any) => record.type === value,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <>
          <Tooltip title="Edit">
            <EditOutlined
              style={{ color: '#1890ff', fontSize: '16px', cursor: 'pointer', marginLeft: '8px' }}
              onClick={() => handleEditModalOpen(record.id)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteFilled
              style={{ color: '#f5222d', fontSize: '16px', cursor: 'pointer', marginLeft: '8px' }}
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <div>
      <Search
        placeholder="Search Products"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        style={{ marginBottom: '16px' }}
      />

      

      <Table dataSource={sortedList} columns={columns} />

      {/* Edit Product Modal */}
      <Modal
        title="Edit Product"
        visible={editProductModal.visible}
        onOk={handleEditProductSubmit}
        onCancel={handleEditModalClose}
      >
        <Form>
          <Form.Item label="Product Name">
            <AntInput
              value={editedProduct.name}
              onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Product Type">
            <AntInput
              value={editedProduct.type}
              onChange={(e) => setEditedProduct({ ...editedProduct, type: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductList;
