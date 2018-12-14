import React from 'react';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/lib/Creatable';
import Toggle from './Toggle';

export default function PostForm(props) {
    const {
        title,
        slug,
        content,
        isPublic,
        tags,
        onTagsSelectedChange,
        onPublicToggleClick,
        onElementChange,
        selectedTags,
        isTagsLoading
    } = props;

    return (
        <div className={`w-full`}>
            <div className={`flex flex-row-reverse`}>
                <div>
                    <button
                        className={`bg-transparent hover:bg-green text-green-dark hover:text-white py-2 px-4 border border-green hover:border-transparent rounded`}>Ready
                        to publish?
                    </button>
                </div>
                <div className={`flex items-center mr-4`}>
                    <Toggle
                        toggle={isPublic}
                        toggleOnText={`It is now public`}
                        toggleOnTextColor={`text-green`}
                        toggleOffText={`It is now private`}
                        toggleOffTextColor={`text-orange`}
                        onToggleClick={onPublicToggleClick}
                    />
                </div>
            </div>

            <div className={`mt-5`}>
                <input
                    className={`form-input focus:outline-none focus:bg-white focus:border-blue`}
                    onChange={onElementChange}
                    type='text'
                    name='title'
                    id='post_title'
                    placeholder={`Title`}
                    value={title}
                />
            </div>

            <div className={`mt-5`}>
                <input
                    className={`form-input focus:outline-none focus:bg-white focus:border-blue`}
                    placeholder={`Slug`}
                    onChange={onElementChange}
                    type='text' name='slug'
                    id='post_slug'
                    value={slug}
                />
            </div>

            <div className={`mt-5`}>
                <CreatableSelect
                    theme={(theme) => ({
                        ...theme,
                        spacing: {
                            ...theme.spacing,
                            controlHeight: '3rem'
                        }
                    })}

                    isLoading={isTagsLoading}
                    isDisabled={isTagsLoading}
                    value={selectedTags}
                    options={tags}
                    onChange={onTagsSelectedChange}
                    isMulti
                    placeholder={`Add a tags..`}
                    isValidNewOption={(inputValue, selectValue, selectOptions) => {
                        const isNotDuplicated = !selectOptions
                            .map(option => option.label)
                            .includes(inputValue);
                        const isNotEmpty = inputValue !== '';
                        return isNotEmpty && isNotDuplicated;
                    }}
                />
            </div>

            <div className={`mt-5`}>
                <textarea onChange={onElementChange} id='content' name='content' value={content}/>
            </div>
        </div>
    );
}

PostForm.propTypes = {
    isTagsLoading: PropTypes.bool,
    title: PropTypes.string,
    slug: PropTypes.string,
    tags: PropTypes.array,
    content: PropTypes.string,
    isPublic: PropTypes.bool,
    selectedTags: PropTypes.array,
    onElementChange: PropTypes.func.isRequired,
    onTagsSelectedChange: PropTypes.func.isRequired,
    onPublicToggleClick: PropTypes.func
};
