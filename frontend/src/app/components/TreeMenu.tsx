import React, { useState, useEffect } from 'react';
import Tree from 'rc-tree';
import 'rc-tree/assets/index.css';
import strapi from '@/lib/strapi';

// Определим типы для данных, получаемых от Strapi
interface StrapiDataItem<T> {
  id: number;
  attributes: T;
}

interface Category {
  title: string;
  slug: string;
  children: {
    data: StrapiDataItem<Category>[];
  };
}

// Тип для узла дерева
interface TreeNode {
  key: string;
  title: string;
  children?: TreeNode[];
  isLeaf: boolean;
}

const TreeMenu = () => {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);

  // Функция для загрузки корневых категорий
  const fetchRootCategories = async () => {
    try {
      const response = await strapi.get('/api/categories', {
        params: {
          filters: { parent: { id: { $null: true } } },
          populate: { children: { count: true } }, // Запрашиваем количество дочерних элементов
        },
      });

      const rootNodes: TreeNode[] = response.data.data.map((item: StrapiDataItem<Category>) => ({
        key: item.id.toString(),
        title: item.attributes.title,
        isLeaf: item.attributes.children.data.length === 0,
      }));

      setTreeData(rootNodes);
    } catch (error) {
      console.error('Ошибка при загрузке корневых категорий:', error);
    }
  };

  useEffect(() => {
    fetchRootCategories();
  }, []);

  // Функция для ленивой загрузки дочерних узлов
  const onLoadData = async (node: any): Promise<void> => {
    const { key } = node;
    try {
      const response = await strapi.get(`/api/categories/${key}`, {
        params: {
          populate: { children: { populate: { children: { count: true } } } },
        },
      });

      const childrenNodes: TreeNode[] = response.data.data.attributes.children.data.map((item: StrapiDataItem<Category>) => ({
        key: item.id.toString(),
        title: item.attributes.title,
        isLeaf: item.attributes.children.data.length === 0,
      }));

      // Обновляем состояние дерева, добавляя загруженные дочерние узлы
      setTreeData(origin => {
        const newTree = [...origin];
        const updateNode = (nodes: TreeNode[]): TreeNode[] => {
            return nodes.map(n => {
                if (n.key === key) {
                    return { ...n, children: childrenNodes };
                }
                if (n.children) {
                    return { ...n, children: updateNode(n.children) };
                }
                return n;
            });
        };
        return updateNode(newTree);
      });

    } catch (error) {
      console.error(`Ошибка при загрузке дочерних категорий для узла ${key}:`, error);
    }
  };

  return (
    <Tree
      treeData={treeData}
      loadData={onLoadData}
      showLine
    />
  );
};

export default TreeMenu;
