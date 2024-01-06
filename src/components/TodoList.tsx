'use client';
import React from 'react';
import { removeTodo, toggleTodo, editTodo } from '@/redux/features/todo-slice';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
// import { Typography, Checkbox, Tooltip, Modal, Form, Input } from 'antd';
// import { DeleteFilled, EditOutlined } from '@ant-design/icons';



// ... (your existing imports)
// import { Table, Dropdown, Menu } from 'antd';
// ... (your existing imports)
// ... (your existing imports)

// ... (your existing imports);

// ... (your existing imports)
import { Table, Dropdown, Menu, Input as AntInput, Checkbox, Tooltip, Modal, Form, Select } from 'antd';
import { EditOutlined, DeleteFilled } from '@ant-design/icons';

const { Search } = AntInput;
const { Option } = Select;

const TodoList = () => {
  const { list } = useSelector((state: RootState) => state.todoReducer);
  const dispatch = useDispatch<AppDispatch>();

  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');
  const [editTodoModal, setEditTodoModal] = React.useState<{
    visible: boolean;
    todoId?: number;
  }>({
    visible: false,
  });
  const [editedTodo, setEditedTodo] = React.useState<{ name: string; type: string }>({
    name: '',
    type: '',
  });
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [selectedType, setSelectedType] = React.useState<string | undefined>(undefined);

  const sortedList = React.useMemo(() => {
    const filteredList = list.filter(
      (todo) =>
        todo.name.toLowerCase().includes(searchValue.toLowerCase()) &&
        (selectedType === undefined || todo.type === selectedType)
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

  const handleToggle = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleDelete = (id: number) => {
    dispatch(removeTodo(id));
  };

  const handleSort = (order: 'asc' | 'desc') => {
    setSortOrder(order);
  };

  const handleEditModalOpen = (id: number) => {
    const todoToEdit = list.find((todo) => todo.id === id);

    if (todoToEdit) {
      setEditedTodo({ name: todoToEdit.name, type: todoToEdit.type || '' });
      setEditTodoModal({ visible: true, todoId: id });
    }
  };

  const handleEditModalClose = () => {
    setEditTodoModal({ visible: false, todoId: undefined });
  };

  const handleEditTodoSubmit = () => {
    if (editTodoModal.todoId !== undefined) {
      // Dispatch the editTodo action with the updated name and type
      dispatch(editTodo({ id: editTodoModal.todoId, name: editedTodo.name, type: editedTodo.type }));
      // Close the modal
      handleEditModalClose();
    }
  };

  const columns = [
    {
      title: (
        <div>
          Task{' '}
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
        .map((todo) => todo.type)
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
        placeholder="Search tasks"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        style={{ marginBottom: '16px' }}
      />

      

      <Table dataSource={sortedList} columns={columns} />

      {/* Edit Todo Modal */}
      <Modal
        title="Edit Todo"
        visible={editTodoModal.visible}
        onOk={handleEditTodoSubmit}
        onCancel={handleEditModalClose}
      >
        <Form>
          <Form.Item label="Task">
            <AntInput
              value={editedTodo.name}
              onChange={(e) => setEditedTodo({ ...editedTodo, name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Type">
            <AntInput
              value={editedTodo.type}
              onChange={(e) => setEditedTodo({ ...editedTodo, type: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TodoList;
