import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Resource, Task } from '../types';
import { sampleUsers, sampleResources } from '../data/mockData';

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  users: User[];
  resources: Resource[];
  addResource: (resource: Resource) => void;
  deleteResource: (id: string) => void;
  updateTask: (userId: string, taskId: string, completed: boolean) => void;
  addTask: (task: Task) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(sampleUsers[0]);
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [resources, setResources] = useState<Resource[]>(sampleResources);

  const addResource = (resource: Resource) => {
    setResources(prev => [...prev, resource]);
  };

  const deleteResource = (id: string) => {
    setResources(prev => prev.filter(r => r.id !== id));
  };

  const updateTask = (userId: string, taskId: string, completed: boolean) => {
    setUsers(prevUsers =>
      prevUsers.map(user => {
        if (user.id === userId) {
          const updatedTasks = user.tasks.map(task =>
            task.id === taskId
              ? { ...task, completed, status: completed ? 'completed' : 'in-progress' }
              : task
          );
          const completedCount = updatedTasks.filter(t => t.completed).length;
          const progress = Math.round((completedCount / updatedTasks.length) * 100);
          
          return { ...user, tasks: updatedTasks, progress };
        }
        return user;
      })
    );

    // Update current user if it's the one being modified
    if (currentUser.id === userId) {
      setCurrentUser(prev => {
        const updatedTasks = prev.tasks.map(task =>
          task.id === taskId
            ? { ...task, completed, status: completed ? 'completed' : 'in-progress' }
            : task
        );
        const completedCount = updatedTasks.filter(t => t.completed).length;
        const progress = Math.round((completedCount / updatedTasks.length) * 100);
        
        return { ...prev, tasks: updatedTasks, progress };
      });
    }
  };

  const addTask = (task: Task) => {
    setUsers(prevUsers =>
      prevUsers.map(user => {
        if (user.role === 'employee') {
          const updatedTasks = [...user.tasks, { ...task, id: `${user.id}-${task.id}` }];
          const completedCount = updatedTasks.filter(t => t.completed).length;
          const progress = Math.round((completedCount / updatedTasks.length) * 100);
          
          return { ...user, tasks: updatedTasks, progress };
        }
        return user;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users,
        resources,
        addResource,
        deleteResource,
        updateTask,
        addTask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
