"""
@ModuleName: json_parser
@Description: 
@File: json_parser
@IDE: PyCharm
@Author: Beier
@Time: 2024/11/18 11:56
@Github: https://github.com/srx-2000
"""
import json


def find_key_in_json(json_data, target_key, current_path=None, result=None):
    """
    遍历 JSON 数据，查找所有匹配的 key，并记录路径和值。

    :param json_data: 要遍历的 JSON 数据（字典或列表）
    :param target_key: 目标 key
    :param current_path: 当前的路径（内部递归使用）
    :param result: 用于存储结果的字典（内部递归使用）
    :return: 包含目标 key 和路径的字典
    """
    if current_path is None:
        current_path = []
    if result is None:
        result = {}

    # 如果是字典，遍历键值对
    if isinstance(json_data, dict):
        for key, value in json_data.items():
            new_path = current_path + [key]  # 更新路径
            if key == target_key:  # 匹配目标 key
                if target_key not in result:
                    result[target_key] = []
                result[target_key].append({"path": new_path, "value": value})
            # 递归处理值
            find_key_in_json(value, target_key, new_path, result)

    # 如果是列表，遍历元素
    elif isinstance(json_data, list):
        for index, item in enumerate(json_data):
            new_path = current_path + [f"[{index}]"]  # 更新路径（列表用索引表示）
            find_key_in_json(item, target_key, new_path, result)

    return result


def find_value_in_json(json_data, target_value, current_path=None, result=None):
    """
    遍历 JSON 数据，查找所有匹配的值，并记录路径。

    :param json_data: 要遍历的 JSON 数据（字典或列表）
    :param target_value: 目标值
    :param current_path: 当前的路径（内部递归使用）
    :param result: 用于存储结果的字典（内部递归使用）
    :return: 包含匹配路径和值的列表
    """
    if current_path is None:
        current_path = []
    if result is None:
        result = []

    # 如果是字典，遍历键值对
    if isinstance(json_data, dict):
        for key, value in json_data.items():
            new_path = current_path + [key]  # 更新路径
            if value == target_value:  # 匹配目标值
                result.append({"path": new_path, "value": value})
            # 递归处理值
            find_value_in_json(value, target_value, new_path, result)

    # 如果是列表，遍历元素
    elif isinstance(json_data, list):
        for index, item in enumerate(json_data):
            new_path = current_path + [f"[{index}]"]  # 更新路径（列表用索引表示）
            find_value_in_json(item, target_value, new_path, result)

    # 如果是其他类型的值，直接比较
    else:
        if json_data == target_value:
            result.append({"path": current_path, "value": json_data})

    return result


def get_path_value_dict(json_data, match_str, is_value=False, path_filter="", only_values=True):
    if is_value:
        result = find_value_in_json(json_data, match_str)
        result = {match_str: result}
    else:
        result = find_key_in_json(json_data, match_str)
    sum_path_dict = {}
    # 打印结果
    for key, matches in result.items():
        for match in matches:
            sum_path = ""
            temp_name = ""
            for i in match['path']:
                temp_name = i
                if "[" not in i:
                    sum_path = sum_path + f'["{i}"]'
                else:
                    sum_path = sum_path + i
            sum_path_dict.update({sum_path: temp_name})
    result_dict = {}
    for sum_path, name in sum_path_dict.items():
        if sum_path.__contains__(path_filter):
            result_dict.update({sum_path: {name: eval(f"json_data{sum_path}")}})
    if only_values:
        return list(result_dict.values())
    return result_dict


def show_all(json_data, key, path_filter=""):
    for k, v in get_path_value_dict(json_data, key, path_filter=path_filter, only_values=False).items():
        print("key==>", k)
        print("value==>", v)


# with open("ex_api1.json", "r", encoding="utf8") as f:
#     json_data = json.load(f)
# with open("most_api_1.json", "r", encoding="utf8") as f:
#     json_data = json.load(f)
# with open("index_api1.json", "r", encoding="utf8") as f:
#     json_data = json.load(f)
with open("test5.json", "r", encoding="utf8") as f:
    json_data = json.load(f)

# show_all(json_data, "vid", path_filter="")
# show_all(json_data, "name", path_filter='[0]["values"]')
# show_all(json_data, "dateRange", path_filter='')
show_all(json_data, "index", path_filter='')
# show_all(json_data, "values", path_filter="skuBase")
names = get_path_value_dict(json_data, "vid")
values = get_path_value_dict(json_data, "name", path_filter='[0]["values"]')
middle_obj = {}

for name, value in zip(names, values):
    middle_obj = name
    middle_obj.update(value)
