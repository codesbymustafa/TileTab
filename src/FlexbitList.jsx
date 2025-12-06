import { useAll_leaves } from './stores/Treestore';

function FlexbitList() {

    const components = useAll_leaves();

  return (
    <ul className="list-none p-0 my-4">
            {components.map((component, index) => (
                <li className="py-2 border-b border-gray-700 text-gray-300 cursor-pointer hover:text-white transition-colors duration-200 last:border-b-0" key={index}>
                {component.component}

                </li>
        ))}
    </ul>
  )
}

export default FlexbitList